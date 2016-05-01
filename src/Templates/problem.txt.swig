~~NOCACHE~~
[[category:problem| ]]

====== Nazwa ======

[[nazwa:={{ data.specification.name }}]] (

{%- for category in data.specification.categories -%}
    [[nalezyDo::kategoria:{{ category | str2doku }}|{{ category }}]]{% if not loop.last %}, {% endif %}
{%- endfor -%}

)

====== Opis problemu ======

Proposed by {% for author in data.specification.authors -%}[[maAutora::autor:{{ author | str2doku }}|{{ author }}]] {%- if not loop.last %}, {% endif %}{%- endfor -%}.

<html>
{% for paragraph in data.specification.specification %}
{{ paragraph | raw }}
{% endfor %}
</html>

====== Dane ======

<html>
{% for paragraph in data.dataFiles.description %}
{{ paragraph | raw }}
{% endfor %}
</html>

{{ '{{' -}}
#ask: [[category:dane]] [[jestDana::problem:{{ id }}]] |
   ?typ=Typ |
   default=Brak plików z danymi!
}}

====== Wyniki  ======

<html>
{% for paragraph in data.results.description %}
{{ paragraph | raw }}
{% endfor %}
</html>

{{ '{{' -}}
#ask: [[category:wynik]] [[jestWynikiem::problem:{{ id }}]] |
   ?typ=Typ |
   default=Brak plików z wynikami!
}}

====== Rozwiązania ======

<html>
{% for paragraph in data.models.description %}
{{ paragraph | raw }}
{% endfor %}
</html>

{{ '{{' -}}
#ask: [[category:rozwiazanie]] [[jestRozwiazaniem::problem:{{ id }}]] |
   ?napisaneW=Język |
   default=Brak plików z rozwiązaniami!
}}

{% if data.references.references.length %}
====== Źródła ======

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

====== Cytuj ======

Aby zacytować ten problem użyj poniższego kodu bibtex:
{{ data.cite.problem }}

Aby zacytować całą blibliotekę CSPLib użyj następującego kodu:
{{ data.cite.csplib }}
