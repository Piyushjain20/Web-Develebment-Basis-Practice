let quotes = [
    {
        quote :'Be yourself; everyone else is already taken.',
        author : 'Oscar Wilde',
    },
    {
        quote : 'I am selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can not handle me at my worst, then you sure as hell do not deserve me at my best.',
        author : 'Marilyn Monroe',
    },
    {
        quote : 'Two things are infinite: the universe and human stupidity; and I am not sure about the universe.',
        author : 'Albert Einstein',
    },
    {
        quote :'So many books, so little time.',
        author : 'Frank Zappa',
    },
    {
        quote :'A room without books is like a body without a soul.',
        author : 'Marcus Tullius Cicero',
    }
]

let btn = document.querySelector('button');
btn.addEventListener('click',function(){
    let newQuote = quotes[Math.floor(Math.random()*quotes.length)];
    let quoteText = document.querySelector('#quote');
    quoteText.innerText = newQuote.quote;
    let authorNew = document.querySelector('#author');
    authorNew.innerText = newQuote.author;
});