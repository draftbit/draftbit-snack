import * as React from "react";
import qs from "query-string";
import QRCode from "qrcode.react";
import { SnackSession } from "snack-sdk";
import {
  filesToSnackFileStructure,
  importsToDependencies,
  DRAFTBIT_MODULES,
  INITIAL_LOADING_CODE,
  EXPO_VERSION,
} from "./expoSdkModules";

// snack is proxied through draftbit as requested by tc & ide
// const API_URL = "https://api.draftbit.com/graphql";

/*
 * !!!!!
 * This was all copied over from github.com/expo/snack-web
 * https://github.com/expo/snack-web/blob/master/src/client/components/App.tsx
 * This is missing the proxy part, perhaps we can get that working as well eventually
 * !!!!!
 */
const player = {};
let listeners = [];
let session;
const BROADCAST_CHANNEL_NAME = "SNACK_BROADCAST_CHANNEL";
const Snack = {
  create(options) {
    session = new SnackSession({
      ...options,
      player: {
        subscribe: () => player.subscribe && player.subscribe(),
        unsubscribe: () => player.unsubscribe && player.unsubscribe(),
        publish: (message) => player.publish && player.publish(message),
        listen: (callback) => {
          listeners.push(callback);
        },
      },
    });
  },

  get session() {
    return session;
  },

  sendMessage(message) {
    listeners.forEach((listener) => listener(message));
  },

  // By default, these methods will return a subscription object
  // We can't serialize it, so we can't call these methods directly on snack session
  // So we add separate methods for this which return undefined
  addStateListener(listener) {
    session.addStateListener(listener);
  },
  addPresenceListener(listener) {
    session.addPresenceListener(listener);
  },
  addErrorListener(listener) {
    session.addErrorListener(listener);
  },
  addLogListener(listener) {
    session.addLogListener(listener);
  },
  setDependencyErrorListener(listener) {
    session.dependencyErrorListener = listener;
  },
  setPlayerSubscribe(subscribe) {
    player.subscribe = subscribe;
  },
  setPlayerUnsubscribe(unsubscribe) {
    player.unsubscribe = unsubscribe;
  },
  setPlayerPublish(publish) {
    player.publish = publish;
  },
};

export default class DraftbitSnackSession extends React.PureComponent {
  constructor(props) {
    super(props);

    const dependencies = {
      ...DRAFTBIT_MODULES,
      ...importsToDependencies(props.imports),
    };

    const snackSessionState = {
      name: `(Draftbit) TEST`,
      sdkVersion: EXPO_VERSION,
      description: "My app powered by Draftbit",
      files: {
        "App.js": {
          type: "CODE",
          contents: INITIAL_LOADING_CODE,
        },
      },
      dependencies,
    };

    this.state = {
      url: null,
      savedUrl: undefined,
      savingUrl: false,
      enableDebugMenu: false,
      snackSessionState,
      snackSessionReady: false,
      sendCodeOnChangeEnabled: true,
      connectedDevices: [],
      deviceLogs: [],
      deviceErrror: undefined,
      channel: props.appUuid,
      deviceId: props.deviceId ? props.deviceId : null,
      dependenciesResolved: false,
    };
  }

  componentDidMount() {
    this._snack = Snack;
    this.startSnack();
    this._checkForDebugParams();

    try {
      this.setupBroadcast();
    } catch (err) {
      // BroadcastChannel not supported in Safari.
      // Since this is only used for the WebPreview we're ok with this
      // We want to stay close to Snack parity so we're keeping this instead of removing
    }

    this._snack.session.setPubNubEnabled();
  }

  _checkForDebugParams = () => {
    try {
      const { debug } = qs.parse(window.location.search);
      this.setState({
        enableDebugMenu: Boolean(debug),
      });
    } catch (err) {
      this.setState({ enableDebugMenu: false });
    }
  };

  setupBroadcast = () => {
    this._broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME, {
      webWorkerSupport: false,
    });

    this._broadcastChannel.postMessage({
      type: "NEW_TAB",
      id: this.props.appUuid,
    });

    this._broadcastChannel.addEventListener("message", (e) => {
      // eslint-disable-next-line
      console.error("SNACK:BROADCAST_CHANNEL_ERROR", e);
    });

    window.addEventListener("message", this._handleSnackPostMessage);
  };

  componentDidUpdate(prevProps) {
    console.log("didUpdate", prevProps);
    const { screenUuid } = this.props;
    const { screenCode, snackFiles } = this.props;

    if (!snackFiles.length || !screenCode || !screenUuid) return;

    if (!prevProps.screenUuid && screenUuid) {
      this.updateSnack();
      return;
    }

    if (screenUuid !== prevProps.screenUuid && prevProps.screenUuid) {
      this.updateSnack();
      return;
    }

    if (screenCode !== prevProps.screenCode && prevProps.screenCode) {
      this.updateSnack();
      return;
    }

    if (snackFiles !== prevProps.snackFiles && prevProps.snackFiles) {
      this.updateSnack();
      return;
    }
  }

  updateSnack = async () => {
    const { screenCode, screenSlug, snackFiles } = this.props;

    console.log("snackFiles", snackFiles);
    window.snackFiles = snackFiles;

    const path = `screens/${screenSlug}.js`;

    const files = filesToSnackFileStructure(snackFiles);
    // Makes Snack work better
    delete files["package.json"];
    await this._snack.session.sendCodeAsync({
      ...files,
      [path]: {
        type: "CODE",
        contents: screenCode,
      },
    });
  };

  componentWillUnmount() {
    try {
      this._broadcastChannel.close();
      window.removeEventListener("message", this._handleSnackPostMessage);
    } catch (err) {
      // BroadcastChannel not supported in Safari.
      // Since this is only used for the WebPreview we're ok with this
      // We want to stay close to Snack parity so we're keeping this instead of removing
    }
  }

  _syncDependenciesAsync = async (dependencies) => {
    try {
      await this._snack.session.syncDependenciesAsync(
        dependencies,
        (name, e) => {
          this._snack.session.addModuleAsync(name);
          // eslint-disable-next-line
          console.error("SNACK:Error syncing dependency, retrying", name, e);
        }
      );
    } catch (err) {
      // eslint-disable-next-line
      console.error("SNACK:Error syncing ALL dependencies:", err);
    }
  };

  reloadSnack = () => this._snack.session.reloadSnack();

  saveSnackAsync = async () => {
    try {
      this.setState({ savingUrl: true });
      const res = await this._snack.session.saveAsync();
      this.setState({
        savedUrl: `https://snack.expo.io/${res.id}`,
        savingUrl: false,
      });
    } catch (err) {
      this.setState({ savingUrl: false });
      // Notify.failure("Couldn't save snack, try again please");
    }
  };

  startSnack = async () => {
    const { snackSessionState } = this.state;

    this._snack.create({
      verbose: false,
      files: snackSessionState.files,
      name: snackSessionState.name,
      description: snackSessionState.description,
      sdkVersion: snackSessionState.sdkVersion,
      dependencies: snackSessionState.dependencies,
      deviceId: this.state.deviceId,
      sessionId: this.state.channel,
    });

    // snack is proxied through draftbit (as requested by tc & ide)
    // this._snack.session.expoApiUrl = API_URL + "/snack";

    await this._snack.session.startAsync();
    const url = await this._snack.session.getUrlAsync();
    const channel = await this._snack.session.getChannel();
    const sessionState = await this._snack.session.getState();

    this.setState({
      url,
      channel,
      snackSessionState: sessionState,
      snackSessionReady: true,
    });

    await this._syncDependenciesAsync(snackSessionState.dependencies);
    await this.updateSnack();
    this.setState({ dependenciesResolved: true });
  };

  _handleSnackPostMessage = (event) => {
    if (
      event.origin !== window.location.origin ||
      !this._snackPlayerIsSubscribed
    ) {
      return;
    }

    this._snack.sendMessage(event.data);
  };

  _handleDeviceConnectionAttempt = () => {
    this._snack.session.setPubNubEnabled();
  };

  _handleSnackDependencyError = (error) => {
    // eslint-disable-next-line
    console.error("SNACK: Dependency Error", error);
  };

  _handleSnackSessionLog = (payload) => {
    const deviceLog = {
      device: payload.device,
      method: payload.method,
      payload: payload.arguments,
    };

    this.setState((state) => ({
      deviceLogs: [...state.deviceLogs.slice(-99), deviceLog],
    }));
  };

  _handleSnackSessionError = (errors) => {
    let deviceError;

    if (errors.length) {
      deviceError = {
        message: errors[0].message,
      };

      if (errors[0].startColumn && errors[0].startLine) {
        deviceError.loc = [errors[0].startLine, errors[0].startColumn];
      }

      if (errors[0].startLine) {
        deviceError.line = errors[0].startLine;
      }

      if (errors[0].startColumn) {
        deviceError.column = errors[0].startColumn;
      }
    }

    this.setState({
      deviceError,
    });
  };

  _handleSnackSessionPresence = (presence) => {
    if (presence.status === "join") {
      this.setState((state) => ({
        connectedDevices: [...state.connectedDevices, presence.device],
        deviceError: undefined,
      }));
    } else if (presence.status === "leave") {
      this.setState((state) => ({
        connectedDevices: state.connectedDevices.filter(
          (device) => device.id !== presence.device.id
        ),
        deviceError: undefined,
      }));
    }
  };

  _handleClearDeviceLogs = () =>
    this.setState({
      deviceLogs: [],
    });

  render() {
    return (
      <div>
        {this.state.url ? <QRCode value={this.state.url} size={200} /> : null}
        <br />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
    // return this.props.children({
    //   url: this.state.url,
    //   enableDebugMenu: this.state.enableDebugMenu,
    //   savedUrl: this.state.savedUrl,
    //   savingUrl: this.state.savingUrl,
    //   startSnack: this.startSnack,
    //   saveSnack: this.saveSnackAsync,
    //   loading: !this.state.snackSessionReady,
    // });
  }
}
