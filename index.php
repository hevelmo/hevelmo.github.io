<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Portafolio de Desarrollo Web</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Portafolio de Desarrollo Web</h1>
    <nav>
      <ul>
        <li><a href="#about-me">Sobre mí</a></li>
        <li><a href="#projects">Proyectos</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="about-me">
      <h2>Sobre mí</h2>
      <div id="about-me-container"></div>
    </section>

    <section id="projects">
      <h2>Proyectos</h2>
      <div id="projects-container"></div>
    </section>

    <section id="contact">
      <h2>Contacto</h2>
      <form id="contact-form">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Mensaje:</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>
