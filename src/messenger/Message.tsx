import { PureComponent } from "react";
import { Text } from "../components";
import { Icon } from "@blueprintjs/core";
import { Timestamp } from "../database/Firebase";

interface MessageProps {
  authorName: string;
  photoURL?: string;
  id: string;
  message: string;
  postedAt: Timestamp;
}

interface Props {
  item: MessageProps;
}

export default class Message extends PureComponent<Props> {
  private item: MessageProps;
  private date: string;
  private time: string;

  constructor(props: Props) {
    super(props);
    this.item = props.item;
    this.date = (
      this.item.postedAt ? this.item.postedAt.toDate() : new Date()
    ).toLocaleDateString();
    this.time = (
      this.item.postedAt ? this.item.postedAt.toDate() : new Date()
    ).toLocaleTimeString();
  }

  static readonly iconSize = 48;

  render() {
    return (
      <div className='flex-row' style={{ marginBottom: '5px' }}>
        {this.item.photoURL ? (
          <img
            src={this.item.photoURL}
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
          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            {`${this.item.authorName} [ ${this.date} @ ${this.time} ] `}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 400, textAlign: 'left' }}>
            {this.item.message}
          </Text>
        </div>
      </div>
    );
  }
}
