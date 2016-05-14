~~NOCACHE~~
[[category:data| ]]
[[type:={{ dataFile.type }}| ]]
====={{ dataFile.filename }}=====

Problem: [[isData::problem:{{ problem.id }} | {{ problem.name }} ]]

File: {{ dataFile.file }}\\
{% if dataFile.notes %}
Opis: <html>{{ dataFile.notes | raw }}</html>
{% endif %}