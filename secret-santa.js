import { LitElement, html, css } from 'lit-element';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-list';

class SecretSanta extends LitElement {
  constructor() {
    super();
    this.participants = [];
    this.lottery = [];
    this.lotteryDone = false;
  }

  static get properties() {
    return {
      participants: {
        type: Array,
      },
      lottery: {
        type: Array,
      },
      lotteryDone: {
        type: Boolean,
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
      .addressee {
        color: red;
      }
      .sender {
        color: green;
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

  _giftChanged(e) {
    let id = e.target.id.replace('N', 'A');
    const currentGift = this.shadowRoot.getElementById(id);
    if (e.target.value.length > 0) {
      currentGift.removeAttribute('disabled');
    } else {
      currentGift.setAttribute('disabled', '');
    }
  }

  _addParticipant(e) {
    const newP = {
      id: Math.random(),
      pName: this.participantName.value,
      gifts: [],
    };
    this.participants = [...this.participants, newP];
  }

  _addGift(e) {
    const id = e.target.id.replace('A', '');
    const gName = this.shadowRoot.getElementById(id + 'N');
    const currentP = this.participants.find((p) => p.id == id);
    currentP.gifts = [...currentP.gifts, gName.value];
    this.requestUpdate();
  }

  _doLottery() {
    const max = this.participants.length - 1;
    const res = [];
    for (let index = 0; index < this.participants.length; index++) {
      if (index === max) {
        res.push([this.participants[max].pName, this.participants[0].pName]);
      } else {
        res.push([
          this.participants[index].pName,
          this.participants[index + 1].pName,
        ]);
      }
    }
    this.lottery = res;
    this.lotteryDone = true;
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
        <mwc-button
          id="addP"
          @click="${this._addParticipant}"
          raised
          disabled
          label="agregar"
        ></mwc-button>
        <mwc-list>
          ${this.participants.map(
            (p) =>
              html`
                <mwc-list-item graphic="avatar">
                  <span>${p.pName}</span>
                  <mwc-icon slot="graphic">account_circle</mwc-icon>
                </mwc-list-item>
                <mwc-textfield
                  id="${p.id + 'N'}"
                  @change="${this._giftChanged}"
                  label="Regalo"
                ></mwc-textfield>
                <mwc-button
                  id="${p.id + 'A'}"
                  raised
                  disabled
                  @click="${this._addGift}"
                  label="agregar"
                ></mwc-button>
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
        ${this.participants.length > 2
          ? html`
            <mwc-button
            raised
            @click="${this._doLottery}"
            label="hacer sorteo"
          ></mwc-button>
        </div>`
          : html`
            <mwc-button
            raised
            disabled
            label="hacer sorteo"
          ></mwc-button>
        </div>`}
        ${this.lotteryDone
          ? html`
              <h3>¡El sorteo está listo!</h3>
              <p>
                ${this.lottery.map(
                  (p) =>
                    html`<span class="sender">${p[0]}</span> le regala a
                      <span class="addressee">${p[1]}</span><br />`
                )}
              </p>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('secret-santa', SecretSanta);
