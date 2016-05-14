~~NOCACHE~~
[[category:data| ]]
[[type:={{ dataFile.type }}| ]]
====={{ dataFile.filename }}=====

Problem: [[isData::problem:{{ problem.id }} | {{ problem.name }} ]]

File: {{ '{{' -}}
:csplib:{{ problem.id }}_{{ dataFile.filename }}|}}\\

{% if dataFile.notes %}
Opis: <html>{{ dataFile.notes | raw }}</html>
{% endif %}