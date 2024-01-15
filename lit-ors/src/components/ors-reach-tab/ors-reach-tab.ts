import "@vaadin/icon";
import "@vaadin/icons";
import "@vaadin/tabs";
import "@vaadin/tabsheet";
import "@vaadin/text-field";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ors-reach-tab")
export class OrsReachTab extends LitElement {
    @property({ type: String }) reachCenterLabel: string = "";
    @property({ type: Number }) rangeValue = 1;
    @property({ type: Number }) intervalValue = 1;

    firstUpdated(props: any) {
        super.firstUpdated(props);
    }

    updated(changedProperties: Map<string, any>){
      super.updated(changedProperties);

      if (changedProperties.has('rangeValue') || changedProperties.has('intervalValue')) {
        // Ensure intervalValue is not greater than rangeValue
        if (this.intervalValue > this.rangeValue) {
          this.intervalValue = this.rangeValue;
        }
      }
    }

    render(){
        return html`
        <ors-search
        id=${"searchReachCenter"}
        .searchTerm=${this.reachCenterLabel}
        .type=${"center"}
        .label=${"Centrum izochrony:"}
        ></ors-search>
        <div class="slider-container">
        <p>Range</p>
        <input
          type="range"
          min="1"
          max="15"
          step="1"
          .value=${this.rangeValue}
          @input=${(e: any) => (this.rangeValue = e.target.value)}
        />
        <p>Selected Value: ${this.rangeValue}</p>
      </div>

      <div class="slider-container">
        <p>Interval</p>
        <input
          type="range"
          min="1"
          max=${this.rangeValue}
          step="1"
          .value=${this.intervalValue}
          @input=${(e: any) => (this.intervalValue = e.target.value)}
        />
        <p>Selected Value: ${this.intervalValue}</p>
      </div>`;
    }
    
    static styles? = css`
    :host {
      height: 100%;
      display: block;
      padding: 16px;
    }
    vaadin-text-field {
      width: 100%;
    }
    input {
      width: 100%;
      -webkit-appearance: none;
      appearance: none;
      height: 10px;
      border-radius: 5px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }

    input:hover {
      opacity: 1;
    }

    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #4CAF50;
      cursor: pointer;
    }

    input::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #4CAF50;
      cursor: pointer;
    }

    label {
      display: block;
      margin-bottom: 8px;
      margin-top: 8px;
    }
  `;
}