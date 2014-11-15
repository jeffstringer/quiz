var Quiz = {
  initialize: function() {
    this.allQuestions = [ {question: "What is 1 + 1?", choices: ["3", "2", "1", "0"], correctAnswer:1, myAnswer: ''},
                          {question: "What color is the sky?", choices: ["Red", "Orange", "Green", "Blue"], correctAnswer:3, myAnswer: ''},
                          {question: "What are the colors of the Canadian Flag?", choices: ["Red and Green", "Yellow, Red and Black", "Red and White", "Red, White and Blue"], correctAnswer:2, myAnswer: ''},
                          {question: "Who is the president of the United States of America?", choices: ["Obama", "Reagan", "Bush", "Warshington"], correctAnswer:0, myAnswer: ''},
                          {question: "What state do you live in?", choices: ["Warshington", "Alabama", "Hawaii", "Oregon"], correctAnswer:3, myAnswer: ''}];
  },
  markAnswer: function(question, answer) {
    var index = this.allQuestions.indexOf(question);
    this.allQuestions[index].myAnswer = answer;
  },
  nextQuestion: function(question) {
    return this.allQuestions[($.inArray(question, this.allQuestions) + 1) % this.allQuestions.length];
  },
  previousQuestion: function(question) {
    return this.allQuestions[($.inArray(question, this.allQuestions) - 1) % this.allQuestions.length];
  },
  totalScore: function() {
    var score = 0;
    var points = 100/(this.allQuestions.length);
    this.allQuestions.forEach(function(question) {
      if (question.correctAnswer === question.myAnswer) {
        score += points;
      }
    });
    return score;
  }
}

$(document).ready(function(){
  var quiz = Object.create(Quiz);
  quiz.initialize();

  $("button#begin").click(function(event) {
    $("button#begin").remove();
    start();
  });
  
  var currentQuestion = quiz.allQuestions[0];

  $("button#previous").click(function() {
    currentQuestion = quiz.previousQuestion(currentQuestion);
    start();
    $("#choice" + currentQuestion.myAnswer).prop("checked", true);
  });

  $("button#next").click(function() {
    if ($("#select")) {
      $("#select").remove();
    }
    if (currentQuestion.myAnswer === '') {
      $("div.question").prepend("<p id='select'>Please make a selection.</p>");
      return;
    } 
    currentQuestion = quiz.nextQuestion(currentQuestion);
    if (quiz.allQuestions.indexOf(currentQuestion) !== 0) {
      start(); 
    } else {
      end();
    }
  });

  var start = function() {
    $("button#previous").hide();
    $("button#next").show();
    if (quiz.allQuestions.indexOf(currentQuestion) > 0) {
      $("button#previous").show(); 
    } 
    $("div.question").empty();
    $("div.question").append("<p>" + currentQuestion['question'] + "</p>");
    currentQuestion.choices.forEach(function(choice) {
      $("div.question").append("<p><input type='radio' id='choice" + currentQuestion.choices.indexOf(choice) + "' value=" + currentQuestion.choices.indexOf(choice) + " class='choice' name='choice'>" + " " + choice + " " + "</input></p>");
    });
    $("input[type='radio']").click(function(){
      var chosen = parseInt($(".choice:checked").val());
      quiz.markAnswer(currentQuestion,chosen); 
    });
  }

  var end = function() {
    $("button#next").remove();
    $("button#previous").remove(); 
    $("div.question").empty();
    $("div.question").append("<h4>Your final score is: " + quiz.totalScore() + "</h4>");
    $("button#again").show();
    $("button#again").click(function() {
      location.reload();
    });
  }
});
