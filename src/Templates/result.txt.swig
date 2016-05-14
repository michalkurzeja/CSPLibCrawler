~~NOCACHE~~
[[category:result| ]]
[[type:={{ result.type }}| ]]
====={{ result.filename }}=====

Problem: [[isResultOf::problem:{{ problem.id }} | {{ problem.name }} ]]

File: {{ '{{' -}}
:csplib:{{ problem.id }}_{{ result.filename }}|}}\\

{% if result.notes %}
Opis: <html>{{ result.notes | raw }}</html>
{% endif %}