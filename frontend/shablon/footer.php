<button class="call-chat" type="button">
  <img src="./img/chat-bubble.png" alt="">
</button>
<div class="online-chat">
  <div class="online-chat__top">
    <div class="online-chat__info">
      <span class="online-chat__support">Support</span>
      <span class="online-chat__online">Online</span>
    </div>
    <button class="online-chat__close" type="button">
      <img src="./img/close.svg" alt="" width="24" height="24">
    </button>
  </div>
  <div class="online-chat__main">
    <p class="online-chat__message online-chat__message-left">Hello, I need some help</p>
    <p class="online-chat__message online-chat__message-right">Hello, we are bla bla bla, what do you need?</p>
  </div>
  <form class="online-chat__form">
    <input type="text" class="online-chat__inp" placeholder="Write your message">
    <button type="submit" class="online-chat__send">Send</button>
  </form>
</div>

<footer class="container space-2 text-center d-flex flex-column align-items-center">
  <!-- Logo -->
  <a class="navbar-brand footer-logo" href="index.php" aria-label="Front">
    <img src="img/black-bitcoin.png" alt="Print Your Wallet Logo">
    <div class="navbar-brand__text">
      <span class='navbar-brand__name'>Royal crypto union</span>
      <span class="navbar-brand__descr">Print your coins secure offline</span>
    </div>
  </a>
  <!-- End Logo -->

  <p class="font-size-1 mb-1">We're proud to be part of the <a href="index.php"><b>1% for impact</b></a> family.</p>
  <p class="font-size-1">© RoyalCryptoUnion 2018. All rights reserved.</p>

   <!-- Social Networks -->
  <!-- Facebook -->
  <div class="d-flex">
    <li class="list-inline-item mb-2 mb-sm-0">
      <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle">
      <!-- <a class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="#" target="blank"> -->
        <img src="./img/facebook.png" alt="" width="30">
      <!-- </a> -->
      </button>
    </li>
  <!-- Medium -->
    <li class="list-inline-item mb-2 mb-sm-0">
      <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle">
      <!-- <a class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="#" target="blank"> -->
        <img src="./img/youtube.png" alt="" width="30">
      <!-- </a> -->
      </button>
    </li>
  <!-- Twitter -->
    <li class="list-inline-item mb-2 mb-sm-0">
      <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle">
      <!-- <a class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="#" target="blank"> -->
        <img src="./img/twitter.png" alt="" width="30">
      <!-- </a> -->
      </button>
    </li>
  <!-- instagram -->
    <li class="list-inline-item mb-2 mb-sm-0">
      <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle">
      <!-- <a class="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="#" target="blank"> -->
        <img src="./img/instagram.png" alt="" width="30">
      <!-- </a> -->
      </button>
    </li>
  </div>
<!-- End Social Networks -->
</footer>
<!-- ========== END FOOTER ========== -->
<!-- ========== End Footer ========== -->
<!-- JS Implementing Plugins -->
<script src="assets/vendor/hs-counter/dist/hs-counter.min.js"></script>
<script src="assets/vendor/appear.js"></script>

<!-- JS Plugins Init. -->
<script>
  $(document).on('ready', function () {
    // initialization of counter
    $('.js-counter').each(function() {
      var counter = new HSCounter($(this)).init();
    });

    $('.call-chat').on('click', function() {
      console.log('asd');
      $('.online-chat').addClass('active');
      $('.online-chat__close').on('click', function() {
        $('.online-chat').removeClass('active');
      });
    });
  });
</script>


</body>
</html>

