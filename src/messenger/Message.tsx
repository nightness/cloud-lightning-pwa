import { PureComponent } from "react";
import { Text } from "../components";
import { Icon } from "@blueprintjs/core";
import { Timestamp } from "../database/Firebase";

interface MessageProps {
  authorName: string;
  photoURL?: string;
  id: string;
  message: string;
  sentAt: number;
}

interface Props {
  item: MessageProps;
}

export default class Message extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      item: props.item,
      date: (props.item.sentAt
        ? new Date(props.item.sentAt)
        : new Date()
      ).toLocaleDateString(),
      time: (props.item.sentAt
        ? new Date(props.item.sentAt)
        : new Date()
      ).toLocaleTimeString(),
    };
  }

  static readonly iconSize = 48;

  render() {
    const sentAt = new Date();
    sentAt.setTime(this.props.item.sentAt);

    return (
      <div className="flex-row" style={{ marginBottom: "5px" }}>
        {this.props.item.photoURL ? (
          <img
            alt="some text"
            src={this.props.item.photoURL}
            style={{
              width: Message.iconSize,
              height: Message.iconSize,
              borderRadius: Message.iconSize / 2,
            }}
          />
        ) : (
          <Icon icon="user" iconSize={Message.iconSize} />
        )}
        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            {`${this.props.item.authorName} [ ${sentAt.toLocaleString()} ] `}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 400, textAlign: "left" }}>
            {this.props.item.message}
          </Text>
        </div>
      </div>
    );
  }
}
