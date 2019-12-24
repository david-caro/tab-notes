export const View = function() {
    this.showCard = function(question) {
        const questionEle = document.getElementById('question');
        while(questionEle.childNodes.length >= 1) {
            questionEle.removeChild(questionEle.firstChild);
        }
        questionEle.appendChild(questionEle.ownerDocument.createTextNode(question));
    }
}