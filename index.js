class dioToYoutube {
  constructor() {
    this.theSrc = "";
    this.isSrcAvailable = false;
    this.event();
  }

  event() {
    document.addEventListener("click", (e) => {
      const previousBtn = document.getElementById("goToYt");
      if (
        e.target.className === "content-title" ||
        e.target.className ===
          "item-link item-link--common--RP3fp next-and-previous--button--2BBCj" ||
        e.target.className === "content-active play list-group-item"
      ) {
        if (Boolean(previousBtn)) previousBtn.remove();
        this.setYoutubeSrc();
      }

      if (e.target.className === "container pointer-enabled") {
        if (Boolean(previousBtn) === false) {
          this.setYoutubeSrc();
        }
      }
    });
  }

  getEmbeded() {
    const iframe = document.querySelectorAll('iframe[id^="ytc"]');
    return iframe;
  }

  getUniqueVideoValue() {
    const htmlNodeList = this.getEmbeded();
    const iframeSrc = htmlNodeList[0]?.getAttribute("src");
    if (Boolean(iframeSrc[0])) this.isSrcAvailable = true;
    const uniqueValue = iframeSrc
      .replace("https://www.youtube.com/embed/", "")
      .replace(
        "?controls=0&autoplay=1&disablekb=1&enablejsapi=1&fs=0&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&html5=1&cc_load_policy=1&origin=https%3A%2F%2Fweb.digitalinnovation.one&widgetid=1",
        ""
      );
    return uniqueValue;
  }

  setYoutubeSrc() {
    this.theSrc = `https://www.youtube.com/watch?v=${this.getUniqueVideoValue()}`;
    this.insertButtonInTheDom();
  }

  insertButtonInTheDom() {
    if (Boolean(this.isSrcAvailable) && this.theSrc != "") {
      const bodyElement = document.querySelector(
        "#learning-container > div.row > div.lesson-content.col-12.col-md-8 > div > div.card-header > div > div.title.col-11.col-md-11 > div:nth-child(1) > div > h5"
      );

      let button = `
      <div id="goToYt" style="background-color: #e8b038; text-align: center; color: #fff;">
        <p> <a href="${this.theSrc}" target="_blank"> Assista no Youtube na velocidade que quiser! </a></p>
      </div>
      `;

      bodyElement.insertAdjacentHTML("afterbegin", button);
    }
  }
}
new dioToYoutube();
