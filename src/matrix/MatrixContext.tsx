// This context will be for managing the connection to matrix
import { createContext, useState } from "react";
import sdk, {
  createClient,
  ICreateClientOpts,
  MatrixClient,
} from "matrix-js-sdk";

export interface MatrixActions {
  loginWithAccessToken: (
    baseUrl: string,
    userId: string,
    accessToken: string
  ) => Promise<MatrixClient | undefined>;
  loginWithPassword: (
    baseUrl: string,
    userId: string,
    password: string
  ) => Promise<[MatrixClient, Promise<any>] | undefined>;
}

type ContextType = {
  client?: MatrixClient;
  actions: MatrixActions;
};

export const MatrixContext = createContext<ContextType>({
  actions: {
    loginWithAccessToken: async () => undefined,
    loginWithPassword: async () => undefined,
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MatrixProvider = ({ children }: Props) => {
  const [client, setClient] = useState<MatrixClient>();

  const addListeners = (client: MatrixClient) => {
    // All events
    // client.on("event", function (event) {
    //   console.log(event.getType());
    //   console.log(event);
    // });

    //Instead, let's just listen to events happening on the timeline of rooms for which our user is a member:
    client.on("Room.timeline", function (event, room, toStartOfTimeline) {
      console.log(event.event);
    });
  };

  const loginWithAccessToken = async (
    baseUrl: string,
    userId: string,
    accessToken: string
  ) => {
    const ops: ICreateClientOpts = {
      baseUrl,
      accessToken,
      userId,
    };
    const newClient = createClient(ops);
    setClient(newClient);
    return newClient;
  };

  const loginWithPassword: (
    baseUrl: string,
    userId: string,
    password: string
  ) => Promise<[MatrixClient, Promise<any>] | undefined> = async (
    baseUrl: string,
    userId: string,
    password: string
  ) => {
    const client = sdk.createClient(baseUrl);
    return [
      client,
      client.login("m.login.password", {
        user: userId,
        password: password,
      }),
    ];
  };

  const test = (client: MatrixClient) => {
    var rooms = client.getRooms();
    rooms.forEach((room) => {
      console.log("Room: ", room.name);
      // var members = room.getJoinedMembers();
      // members.forEach((member) => {
      //   console.log(member.name);
      // });
    });
  };

  return (
    <MatrixContext.Provider
      value={{
        client,
        actions: { loginWithAccessToken, loginWithPassword },
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
