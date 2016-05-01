~~NOCACHE~~
[[category:wynik| ]]
[[typ:={{ result.type }}| ]]
====={{ result.filename }}=====

Problem: [[jestWynikiem::problem:{{ problem.id }} | {{ problem.name }} ]]

Plik: {{ result.file }}\\
{% if result.notes %}
Opis: <html>{{ result.notes | raw }}</html>
{% endif %}