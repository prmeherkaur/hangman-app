import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restarter=this.restarter.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,idx) => (
      <button
        key={idx+95}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  restarter(evt){
    this.setState({answer:randomWord(),guessed:new Set(),nWrong:0});
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <br></br>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]}  alt={`${this.state.nWrong} Wrong Guesses out of ${this.props.maxWrong} posible wrong guesses`} />
        <h4>No. of wrong guesses so far: {this.state.nWrong}</h4>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {this.guessedWord().join("")===this.state.answer?<p className="winner">Congratulations, you win!</p>:
        <p className='Hangman-btns'>{this.state.nWrong===this.props.maxWrong?`You Lose, sorry the word was ${this.state.answer}`:this.generateButtons()}</p>
        }
        <br></br>
        <button id="Restart-btn" onClick={this.restarter}>Restart</button>
        <br></br>
      </div>
    );
  }
}

export default Hangman;
