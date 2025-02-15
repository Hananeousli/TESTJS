document.addEventListener('DOMContentLoaded', function () {
    let quizForm = document.getElementById('quiz-form');
    let alertDiv = document.getElementById('alert');
    let allCorrect = false; 

    let hasPreviousSuccess = localStorage.getItem('quizSuccess') === 'true';
    if (hasPreviousSuccess) {
        congratulationMessage();
    }

    quizForm.addEventListener('submit', function (event) {
        event.preventDefault();
        checkAnswers(); 
    });

    function checkAnswers() {
        let questions = document.querySelectorAll('.question-item');
        resetAnswerStyles(questions);
        let currentAllCorrect = true; 

        questions.forEach(function (question) {
            let correctAnswer = question.querySelector('.answer[value="true"]');
            let answers = question.querySelectorAll('.answer');
            let isCorrectSelected = Array.from(answers).some(answer => answer.checked && answer.value === 'true');

            if (!isCorrectSelected) {
                highlightIncorrectQuestion(question);
                currentAllCorrect = false;
            } else {
                highlightCorrectQuestion(question);
            }
        });

        if (currentAllCorrect && !allCorrect) {
            allCorrect = true;
            congratulationMessage();
        } else if (!currentAllCorrect && allCorrect) {
            allCorrect = false;
            hideCongratulationsMessage();
        }
    }

    function resetAnswerStyles(questions) {
        questions.forEach(function (question) {
            question.classList.remove('correct', 'incorrect');
        });
    }

    function highlightIncorrectQuestion(question) {
        question.classList.add('incorrect');
    }

    function highlightCorrectQuestion(question) {
        question.classList.add('correct');
    }

    function congratulationMessage() {
        if (allCorrect) {
            alertDiv.style.display = 'block';
            localStorage.setItem('quizSuccess', 'true');
            
            setTimeout(function() {
                hideCongratulationsMessage();
            }, 1300);
        }
    }       

    function hideCongratulationsMessage() {
        alertDiv.style.display = 'none';
        localStorage.removeItem('quizSuccess');
    }
});