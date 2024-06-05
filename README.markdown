<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        header {
            background-color: #4CAF50;
            color: white;
            padding: 1em;
            text-align: center;
        }

        main {
            padding: 1em;
        }

        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 1em;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1em;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Simple Website</h1>
    </header>
    <main>
        <p>This is a paragraph of text on my simple website.</p>
        <button id="clickMeButton">Click Me</button>
    </main>
    <footer>
        <p>&copy; 2024 Simple Website</p>
    </footer>
    <script>
        document.getElementById('clickMeButton').addEventListener('click', function() {
            alert('Button was clicked!');
        });
    </script>
</body>
</html>
