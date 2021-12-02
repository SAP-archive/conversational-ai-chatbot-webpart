/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/unbound-method */

import * as React from 'react';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

import { ChatbotPropsStorage } from './chatbotProps';
import { constants } from '../const';
import * as strings from 'ChatbotStrings';

export default class Chatbot extends React.Component<ChatbotPropsStorage, object> {
  /**
   * Create an instance of the chatbot component.
   *
   * @param props A set of the web part's properties.
   * @param state Web part's current state.
   */
  constructor(props: ChatbotPropsStorage, state: object) {
    super(props);
    this._showDialog = this._showDialog.bind(this);
    this.state = {};
  }

  /**
   * Populate the options' values with the saved ones.
   */
  public componentDidMount(): void {
    this.setState({
      channel: this.props.channel,
      channelId: this.props.channelId,
      token: this.props.token,
      expanderPreferences: this.props.expanderPreferences,
    });
  }

  /**
   * Open the web part's configuration panel.
   */
  private _showDialog(): void {
    this.props.propPaneHandle.open();
  }

  /**
   * Render the web part's placeholder component.
   *
   * @returns A React component for the web part's placeholder box.
   */
  public render(): React.ReactElement<ChatbotPropsStorage> {
    return (
      <div className="ms-Fabric">
        <Placeholder
          iconName="ChatBot"
          iconText={constants.placeholderIconText}
          description={strings.description}
          buttonLabel={strings.buttonConfigure}
          onConfigure={this._showDialog}
        />
      </div>
    );
  }
}

/* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/unbound-method */
