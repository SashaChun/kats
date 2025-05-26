$(document).ready(function() {
  // DOM elements
  const $loginModal = $('#loginModal');
  const $registerModal = $('#registerModal');
  const $loginLink = $('.login');
  const $userIcon = $('.nav-right .icon:contains("👤")');
  const $closeButtons = $('.close');
  const $showRegisterLink = $('#showRegister');
  const $showLoginLink = $('#showLogin');
  const $loginForm = $('#loginForm');
  const $registerForm = $('#registerForm');
  const $userProfile = $('.user-profile');
  const $userName = $('#userName');

  // Check if user is already logged in
  function checkLoginStatus() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in
        $loginLink.text(user.displayName || user.email);
        $loginLink.attr('href', '#');
        $userProfile.css('display', 'flex');
        $userName.text(user.displayName || user.email);

        $loginLink.off('click').on('click', function(e) {
          e.preventDefault();
          if (confirm('Ви дійсно бажаєте вийти?')) {
            logout();
          }
        });
      } else {
        // User is signed out
        $loginLink.text('Увійти');
        $loginLink.attr('href', '#');
        $userProfile.css('display', 'none');

        $loginLink.off('click').on('click', function(e) {
          e.preventDefault();
          openLoginModal();
        });
      }
    });
  }

  // Open login modal
  function openLoginModal() {
    $loginModal.css('display', 'block');
  }

  // Open register modal
  function openRegisterModal() {
    $registerModal.css('display', 'block');
  }

  // Close all modals
  function closeModals() {
    $loginModal.css('display', 'none');
    $registerModal.css('display', 'none');
    // Clear form fields
    $loginForm[0].reset();
    $registerForm[0].reset();
  }

  // Login function
  function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        closeModals();
        alert('Ви успішно увійшли!');
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = 'Помилка входу. Спробуйте ще раз.';

        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
          errorMessage = 'Невірний email або пароль';
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Невірний формат email';
        }

        alert(errorMessage);
      });
  }

  // Register function
  function register(name, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Update profile with display name
        return user.updateProfile({
          displayName: name
        }).then(() => {
          closeModals();
          alert('Реєстрація успішна!');
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = 'Помилка реєстрації. Спробуйте ще раз.';

        if (errorCode === 'auth/email-already-in-use') {
          errorMessage = 'Користувач з таким email вже існує';
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Невірний формат email';
        } else if (errorCode === 'auth/weak-password') {
          errorMessage = 'Пароль занадто слабкий';
        }

        alert(errorMessage);
      });
  }

  // Logout function
  function logout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful
      alert('Ви вийшли з системи');
    }).catch((error) => {
      // An error happened
      alert('Помилка виходу з системи');
    });
  }

  // Event Listeners
  $loginLink.on('click', function(e) {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (confirm('Ви дійсно бажаєте вийти?')) {
          logout();
        }
      } else {
        openLoginModal();
      }
    });
  });

  $userIcon.on('click', function(e) {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (confirm('Ви дійсно бажаєте вийти?')) {
          logout();
        }
      } else {
        openLoginModal();
      }
    });
  });

  $closeButtons.on('click', closeModals);

  $(window).on('click', function(e) {
    if (e.target === $loginModal[0] || e.target === $registerModal[0]) {
      closeModals();
    }
  });

  $showRegisterLink.on('click', function(e) {
    e.preventDefault();
    closeModals();
    openRegisterModal();
  });

  $showLoginLink.on('click', function(e) {
    e.preventDefault();
    closeModals();
    openLoginModal();
  });

  $loginForm.on('submit', function(e) {
    e.preventDefault();
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    login(email, password);
  });

  $registerForm.on('submit', function(e) {
    e.preventDefault();
    const name = $('#registerName').val();
    const email = $('#registerEmail').val();
    const password = $('#registerPassword').val();
    const confirmPassword = $('#confirmPassword').val();

    if (password !== confirmPassword) {
      alert('Паролі не співпадають');
      return;
    }

    register(name, email, password);
  });

  // Initialize
  checkLoginStatus();
});
