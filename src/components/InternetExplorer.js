class InternetExplorer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .e {
        display: inline-block;
        font-family: "Helvetica";
        font-weight: 800;
        font-size: 222px;
        line-height: 90%;
        filter: drop-shadow(0 0 2px #004587);
        color: transparent;
        transform: scaleY(0.85);
        background: linear-gradient(110deg, #3cc5f1 0% 40%, #2079bd 80%);
        -webkit-background-clip: text;
      }

      :host {
        --size: 300px;
        --time: 5s;

        display: block;
        width: var(--size);
        height: var(--size);
        background: transparent;
        position: relative;
        margin: 4em;
      }

      .container {
        width: var(--size);
        height: var(--size);
        filter: drop-shadow(0 0 5px #0008);

        perspective: 330px;
        transform-style: preserve-3d;

        /* animation: change-perspective var(--time) linear 1 forwards; */
      }

      :host(.dead) .container {
        perspective: 1500px;
      }

      :host(.dead) :is(.halo-first, .halo-last) {
        /* translateY(-175px) translateX(-40px) */
        transform: translateY(-50%) translateX(-10%) rotateX(280deg) rotateY(360deg) rotateZ(0deg) scale(0.8);
        border: 40px solid gold;
        box-shadow: 0 0 5px gold;
      }

      .e-letter {
        --size: 90%;
        --x-radius: calc(0.60 * var(--size));
        --y-radius: calc(0.70 * var(--size));

        width: var(--size);
        height: var(--size);
        background:
          linear-gradient(to top, transparent 45%, #3cc5f1 45% 58%, transparent 58%),
          radial-gradient(var(--x-radius) var(--y-radius), transparent 39%, #3cc5f1 40%);
        border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
        clip-path: polygon(0% 0%, 100% 0%, 100% 55%, 60% 55%, 60% 65%, 100% 65%, 100% 100%, 0% 100%);
        box-shadow: -15px -10px 30px 15px #145383 inset;
        transform: translate(5%, 2%);
      }

      .halo-first, .halo-last {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 20px solid gold;
        border-radius: 50%;
        clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        top: 0;
        transform: rotateX(314deg) rotateY(31deg) rotateZ(-25deg);
        /* animation: move-halo var(--time) linear 1 forwards;*/
      }

      .halo-last {
        --adjustment-y: -1px;

        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
      }

      @keyframes change-perspective {
        0% { perspective: 330px; }
        100% { perspective: 1500px; }
      }

      @keyframes move-halo {
        0% {
          transform: rotateX(314deg) rotateY(31deg) rotateZ(-25deg) translateY(0);
        }

        50% {
          transform: matrix3d(0.845658, -0.340341, -0.8, 0, 0.165355, 0.348749, -0.82623, 0, 0.327403, 0.84526, 0.422306, 0, -8.80659, -66.0494, 0, 1);
        }

        100% {
          transform: translateY(-150px) translateX(-20px) rotateX(280deg) rotateY(360deg) rotateZ(0deg) scale(0.8);
        }
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", () => this.classList.toggle("dead"));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${InternetExplorer.styles}</style>
    <div class="container">
      <div class="halo-last"></div>
      <div class="e-letter"></div>
      <div class="halo-first"></div>
    </div>`;
  }
}

customElements.define("internet-explorer", InternetExplorer);
