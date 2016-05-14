~~NOCACHE~~
[[category:problem| ]]

====== Name ======

[[name:={{ data.specification.name }}]] (

{%- for category in data.specification.categories -%}
    [[belongsTo::cat:{{ category | str2doku }}|{{ category }}]]{% if not loop.last %}, {% endif %}
{%- endfor -%}

)

====== Problem description ======

Proposed by {% for author in data.specification.authors -%}[[hasAuthor::author:{{ author | str2doku }}|{{ author }}]] {%- if not loop.last %}, {% endif %}{%- endfor -%}.

<html>
{% for paragraph in data.specification.specification %}
{{ paragraph | raw }}
{% endfor %}
</html>

====== Data ======

<html>
{% for paragraph in data.dataFiles.description %}
{{ paragraph | raw }}
{% endfor %}
</html>

{{ '{{' -}}
#ask: [[category:data]] [[isData::problem:{{ id }}]] |
   ?type=Type |
   default=There is no data!
}}

====== Results  ======

<html>
{% for paragraph in data.results.description %}
{{ paragraph | raw }}
{% endfor %}
</html>

{{ '{{' -}}
#ask: [[category:result]] [[isResultOf::problem:{{ id }}]] |
   ?type=Type |
   default=There is no results!
}}

====== Models ======

<html>
{% for paragraph in data.models.description %}
{{ paragraph | raw }}
{% endfor %}
</html>

{{ '{{' -}}
#ask: [[category:model]] [[isModelOf::problem:{{ id }}]] |
   ?writtenIn=Language |
   default=There is no models!
}}

{% if data.references.references.length %}
====== References ======

{% for reference in data.references.references %}
//{{ reference.bibkey }}//\\
{{ reference.authors | join(', ') }}\\
{% if reference.url -%}
    **[[{{ reference.url }} | {{ reference.title | wrap_entities | raw }}]]**
{%- else -%}
    **{{ reference.title | wrap_entities | raw }}**
{%- endif %}\\
{% if reference.venueType %}{{ reference.venueType | concat(', ') }}{% endif %}{% if reference.venue %}{{ reference.venue | concat(', ') }}{% endif %}{{ reference.date }}
{% for link in reference.links -%}
[[{{ link.url }} | {{ link.label }}]]\\
{%- endfor %}
{% endfor %}

{% endif %}

====== Cite ======

To cite this CSPLib problem, please use the following bibtex entry:
{{ data.cite.problem }}

To cite CSPLib as a whole, please use the following bibtex entry:
{{ data.cite.csplib }}
