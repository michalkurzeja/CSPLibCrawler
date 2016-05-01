~~NOCACHE~~
[[category:rozwiazanie| ]]
[[napisaneW:={{ model.type }}| ]]
====={{ model.filename }}=====

Problem: [[jestRozwiazaniem::problem:{{ problem.id }} | {{ problem.name }} ]]

Plik: {{ model.file }}\\
{% if model.notes %}
Opis: <html>{{ model.notes | raw }}</html>
{% endif %}