class Element {
  #tag;
  #id; // # - приватное поле конструктора
  #classList = [];
  #dataSet = [];
  #children = [];
  #innerText;
  constructor(tagName) {
    this.#tag = tagName;
  }

  setId(id) {
    this.#id = id;
    return this;
  }

  addClass(className) {
    this.#classList.push(className);
    return this;
  }

  addData(dataName, dataValue) {
    this.#dataSet.push({
      dataName,
      dataValue,
    });
    return this;
  }

  addChild(childElement) {
    this.#children.push(childElement);
    return this;
  }

  setText(text) {
    this.#innerText = text;
    return this;
  }

  print() {
    let result = `<${this.#tag}`;
    if (this.#id) {
      result += ` id = '${this.#id}'`;
    }
    if (this.#classList.length > 0) {
      result += ` class = '${this.#classList.join(" ")}'`;
    }
    if (this.#dataSet.length > 0) {
      this.#dataSet.forEach((el) => {
        result += ` data-${data.dataName} = '${data.dataValue}'`; ///
      });
    }
    result += `>`;

    if (this.#innerText) {
      result += this.#innerText;
    }
    if (this.#children.length > 0) {
      this.#children.forEach((child) => {
        result += child.print();
      });
    }
    result += `</${this.#tag}>`;
    return result;
  }
}

class DomBuilder {
  #element;

  get result() {
    return this.#element;
  }

  create(tagName) {
    this.#element = new Element(tagName);
    return this;
  }

  withId(id) {
    this.#element.setId(id);
    return this;
  }

  withClass(className) {
    this.#element.addClass(className);
    return this;
  }

  withData(dataName) {
    this.#element.addData(dataName);
    return this;
  }

  withChild(chaildElement) {
    this.#element.addChild(chaildElement);
  }

  withContent(text) {
    this.#element.setText(text);
    return this;
  }
}

let p1 = new DomBuilder()
  .create("p")
  .withId("p1")
  .withClass("text")
  .withContent("Hello,").result;
let p2 = new DomBuilder()
  .create("p")
  .withId("p2")
  .withClass("text")
  .withContent("world!").result;
let div = new DomBuilder()
  .create("div")
  .withId("main")
  .withClass("container")
  .withChild(p1)
  .withChild(p2).result;   // что-то пошло не по плану



document.body.innerHTML = div.print()   