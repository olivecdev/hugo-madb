; (function () {
  'use strict'

  var navbarBurger = document.querySelector('.navbar-burger')
  if (!navbarBurger) return
  navbarBurger.addEventListener('click', toggleNavbarMenu)

  function toggleNavbarMenu(e) {
    e.preventDefault()
    e.stopPropagation()

    const target = document.getElementById(this.dataset.target)
    if (!target) return

    // Toggle active classes
    this.classList.toggle('is-active')
    target.classList.toggle('is-active')

    // Toggle body scroll
    document.documentElement.classList.toggle('is-clipped--navbar')
  }
})()
