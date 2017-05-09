import React from 'react';
import { render } from 'react-dom';
import Nav from './components/Nav.jsx';
import RecentQuestionsLayout from './components/RecentQuestionsLayout.jsx';
import LiveAnswer from './components/LiveAnswer.jsx';
import Answer from './components/Answer.jsx';
import $ from 'jquery';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
require('!style-loader!css-loader!sass-loader!./sass/all.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      askTitle: '',
      askBody: '',
      username: '',
      userid: '',
    }
    this.createQuestion = this.createQuestion.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    setInterval(this.getQuestions, 5000);
  }

  componentWillMount() {
    this.getQuestions();
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  getQuestions() {
    $.get('/questions', (req, res) => {})
      .then(results => {
        this.changeProp('questions', results)
      })
      .catch(err => {
        console.log('there was an error with get ', err)
      });
  }

  createQuestion(e) {
    console.log('this is e', e);
    e.preventDefault();
    e.stopPropagation();
    var obj = {
      username: 'oriooctopus',
      title: this.state.askTitle,
      body: this.state.askBody 
    };

    $.ajax({
      type: 'POST',
      url: '/questions',
      data: obj,
      success: (data) => {
        console.log('success!', data)
      },
      error: (err) => {
        console.log('error with submitting answer', err)
      }
    })
  }

  submitAnswer() {
    $.ajax({
      type: 'POST',
      url: '/answer',
      data: JSON.stringify(data),
      success: (data) => {
        console.log('success!', data)
      },
      error: (err) => {
        console.log('error with submitting answer', err)
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Nav />
          <Switch>
            <Route exact path="/Answer" component={Answer} />
            <Route exact path="/LiveAnswer" component={LiveAnswer} />
            <Route render={props => (
              <RecentQuestionsLayout
                questions={this.state.questions}
                askDisplayClass={this.state.askDisplayClass} 
                createQuestion={this.createQuestion} 
                askTitle={this.state.askTitle}
                askBody={this.state.askBody}
                changeProp={this.changeProp}
                answerDisplayClass={this.state.answerDisplayClass} 
                submitAnswer={this.submitAnswer}
                updateQuestion={this.updateQuestion}
              />
            )} />
          </Switch>
        </main>
      </BrowserRouter>
    )

    // FOR REFERENCE SAKE THIS HAS BEEN INCLUDED ALONG WITH SOME OLD COMPONENTS 

    // return (
    //   <main>
    //     <Nav />
    //     <RecentQuestions 
    //       changeRight={this.changeRight} 
    //       questions={this.state.questions}
    //     />
    //     <Ask 
    //       askDisplayClass={this.state.askDisplayClass} 
    //       createQuestion={this.createQuestion} 
    //       askTitle={this.state.askTitle}
    //       askBody={this.state.askBody}
    //       changeProp={this.changeProp}
    //     />
    //     <Answer 
    //       answerDisplayClass={this.state.answerDisplayClass} 
    //       submitAnswer={this.submitAnswer}
    //       updateQuestion={this.updateQuestion}
    //     />
    //   </main>
    // )
  }
}

render(<App/>, document.getElementById('app'));









