const container = document.querySelector('.container');
const count = document.querySelector('#count');
const amount = document.querySelector('#amount');
const select = document.querySelector('#movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotalPrice();

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotalPrice();
    }
});

select.addEventListener('change', function(e){
    calculateTotalPrice();
});

function calculateTotalPrice(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArray = [];
    const seatsArray = [];
    
    selectedSeats.forEach(function(seat){
        selectedSeatsArray.push(seat);
    });

    seats.forEach(function(seat){
        seatsArray.push(seat);
    });

    let selectedSeatIndexes = selectedSeatsArray.map(function(seat){
        return seatsArray.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexes);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
           if(selectedSeats.indexOf(index) > -1){
            seat.classList.add('selected');
           } 
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexes){
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}