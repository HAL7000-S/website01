var clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');
$('.row').on(clickEventType, function(event){
  handleRipple(event);
});

function handleRipple(event) {
  const surface = event.currentTarget;
  
  const ripple = document.createElement('span');
  const diameter = Math.max(surface.clientWidth, surface.clientHeight);
  const radius = diameter / 2;
  
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.pageX - surface.offsetLeft - radius}px`;
  ripple.style.top = `${event.pageY - surface.offsetTop - radius}px`;
  ripple.classList.add('ripple'); 
  surface.insertBefore(ripple, surface.firstChild);
  
  setTimeout(() => {
    if(ripple.parentNode){
       ripple.parentNode.removeChild(ripple);
    }
  }, 950)
  /*Fork of an original work Ripple (Touch Update) (https://codepen.io/brussolo-igor/pen/oNpEyjV*/
}

$('div.row').click(function() {
  $(this).siblings('.clicked').toggleClass('clicked');
  $(this).toggleClass('clicked');
  if($(this).hasClass( "clicked" )==false){
    $(this).parent().find('.r0').toggleClass('clicked')
  }
});


$('#exp').click(function() {
  var number = $('.clicked').map(function() {
    return $(this).text();
  }).get();
  console.log(number.join(', ')); // = 'element1, element2, element3'
  var text = number.join(', ');
   $("#res").val(`[${text}]`);
});

new KonamiCode(function () {
  alert("1");
$('.parent').toggleClass('rainbow');
});