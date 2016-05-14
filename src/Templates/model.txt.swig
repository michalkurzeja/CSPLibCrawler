~~NOCACHE~~
[[category:model| ]]
[[writtenIn:={{ model.type }}| ]]
====={{ model.filename }}=====

Problem: [[isModelOf::problem:{{ problem.id }} | {{ problem.name }} ]]

File: {{ '{{' -}}
:csplib:{{ problem.id }}_{{ model.filename }}|}}\\

{% if model.notes %}
Opis: <html>{{ model.notes | raw }}</html>
{% endif %}