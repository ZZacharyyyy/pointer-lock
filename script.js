// check pointerLock support
var havePointerLock = 'pointerLockElement' in document ||
  'mozPointerLockElement' in document ||
  'webkitPointerLockElement' in document;

// element for pointerLock
var requestedElement = document.getElementById('pointer-lock-demo');

// prefixes
requestedElement.requestPointerLock = requestedElement.requestPointerLock || requestedElement.mozRequestPointerLock || requestedElement.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
  document.mozExitPointerLock ||
  document.webkitExitPointerLock;

var isLocked = function() {
  return requestedElement === document.pointerLockElement ||
    requestedElement === document.mozPointerLockElement ||
    requestedElement === document.webkitPointerLockElement;
}

requestedElement.addEventListener('click', function() {
  if (!isLocked()) {
    requestedElement.requestPointerLock();
  } else {
  }
}, false);

var changeCallback = function() {
  if (!havePointerLock) {
    alert('Ваш браузер не поддерживает pointer-lock');
    return;
  }
  if (isLocked()) {
    document.addEventListener("mousemove", moveCallback, false);
    document.body.classList.add('locked');
  } else {
    document.removeEventListener("mousemove", moveCallback, false);
    document.body.classList.remove('locked');
  }
}

document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

var moveCallback = function(e) {
  var x = e.movementX ||
    e.mozMovementX ||
    e.webkitMovementX ||
    0;

  var y = e.movementY ||
    e.mozMovementY ||
    e.webkitMovementY ||
    0;

  var bgPos = window.getComputedStyle(requestedElement)
    .getPropertyValue('background-position')
    .split(' ')
    .map(function(v) {
      return parseInt(v, 10);
    });

  requestedElement.style.backgroundPosition = (bgPos[0] - x) + 'px ' + (bgPos[1] - y) + 'px';
}


// ------------------------------------------------------
// AUTO-REMOVE “To show your cursor, press Esc” OVERLAY
// ------------------------------------------------------
function removeEscMessage() {
  const all = document.querySelectorAll('*');
  all.forEach(el => {
    if (el.innerText && el.innerText.includes("To show your cursor, press Esc")) {
      el.style.display = 'none';
    }
  });
}

// Run immediately
removeEscMessage();

// Watch for re-appearing overlays
const escObserver = new MutationObserver(removeEscMessage);
escObserver.observe(document.body, { childList: true, subtree: true });
