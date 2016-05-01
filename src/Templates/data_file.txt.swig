~~NOCACHE~~
[[category:dane| ]]
[[typ:={{ dataFile.type }}| ]]
====={{ dataFile.filename }}=====

Problem: [[jestDana::problem:{{ problem.id }} | {{ problem.name }} ]]

Plik: {{ dataFile.file }}\\
{% if dataFile.notes %}
Opis: <html>{{ dataFile.notes | raw }}</html>
{% endif %}