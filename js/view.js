export const View = function() {
    this.showCard = function(question, answer) {
        const questionEle = document.getElementById('question');
        while(questionEle.childNodes.length >= 1) {
            questionEle.removeChild(questionEle.firstChild);
        }
        questionEle.appendChild(questionEle.ownerDocument.createTextNode(question));

        const answerEle = document.getElementById('answer');
        while(answerEle.childNodes.length >= 1) {
            answerEle.removeChild(answerEle.firstChild);
        }
        answerEle.appendChild(answerEle.ownerDocument.createTextNode(answer));
    }
}
