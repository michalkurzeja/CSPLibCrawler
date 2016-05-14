~~NOCACHE~~
[[category:model| ]]
[[writtenIn:={{ model.type }}| ]]
====={{ model.filename }}=====

Problem: [[isModelOf::problem:{{ problem.id }} | {{ problem.name }} ]]

File: {{ model.file }}\\
{% if model.notes %}
Opis: <html>{{ model.notes | raw }}</html>
{% endif %}