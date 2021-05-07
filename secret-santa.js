import { LitElement, html, css } from 'lit-element';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-list';

class SecretSanta extends LitElement {
  constructor() {
    super();
    this.participants = [
      {
        pName: 'Alan',
        gifts: ['taza'],
      },
      {
        pName: 'Jose',
        gifts: ['bufanda'],
      },
      {
        pName: 'Rambo',
        gifts: ['Arma'],
      },
    ];
  }

  static get properties() {
    return {
      participants: {
        type: Array,
      },
    };
  }

  static get styles() {
    return css`
      mwc-top-app-bar-fixed {
        --mdc-theme-primary: orange;
        --mdc-theme-on-primary: black;
      }
      .container {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 50vw;
        max-width: 70vw;
      }
      mwc-button {
        --mdc-theme-primary: orange;
        --mdc-theme-on-primary: black;
      }
    `;
  }

  _participantChanged(e) {
    if (e.target.value.length > 0) {
      this.addParticipant.removeAttribute('disabled');
    } else {
      this.addParticipant.setAttribute('disabled', '');
    }
  }

  get addParticipant() {
    return this.shadowRoot.getElementById('addP');
  }

  get participantName() {
    return this.shadowRoot.getElementById('pName');
  }

  render() {
    return html`
      <mwc-top-app-bar-fixed centerTitle="true">
        <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
        <div slot="title">Secret santa</div>
        <mwc-icon-button
          icon="card_giftcard"
          slot="actionItems"
        ></mwc-icon-button>
        <div><!-- content --></div>
      </mwc-top-app-bar-fixed>
      <div class="container">
        <mwc-textfield
          @change="${this._participantChanged}"
          id="pName"
          label="Participante"
        ></mwc-textfield>
        <mwc-button id="addP" raised disabled label="agregar"></mwc-button>
        <mwc-list>
          ${this.participants.map(
            (p) =>
              html`
                <mwc-list-item graphic="avatar">
                  <span>${p.pName}</span>
                  <mwc-icon slot="graphic">account_circle</mwc-icon>
                </mwc-list-item>
                <mwc-textfield label="Regalo"></mwc-textfield>
                <mwc-button raised label="agregar"></mwc-button>
                <mwc-list>
                  ${p.gifts.map(
                    (gift) => html`
                      <mwc-list-item hasMeta>
                        <span>${gift}</span>
                        <mwc-icon slot="meta">card_giftcard</mwc-icon>
                      </mwc-list-item>
                    `
                  )}
                </mwc-list>
                <li divider padded role="separator"></li>
              `
          )}
        </mwc-list>
        <mwc-button raised label="hacer sorteo"></mwc-button>
      </div>
    `;
  }
}

customElements.define('secret-santa', SecretSanta);
