~~NOCACHE~~
[[category:problem| ]]

====== Nazwa ======

[[nazwa:={{ data.specification.name }}]] (

{%- for category in data.specification.categories -%}
    [[nalezyDo::kategoria:{{ category | str2doku }}|{{ category }}]]
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

{{ '{{' -}}
#ask: [[category:dane]] [[jestDana::problem:{{ id }}]] |
   ?typ=Typ |
   default=Brak danych!
}}

====== Wyniki  ======

{{ data.results.description }}

{{ '{{' -}}
#ask: [[category:wynik]] [[jestWynikiem::problem:{{ id }}]] |
   ?typ=Typ |
   default=Brak wyników!
}}

====== Rozwiązania ======

{{ '{{' -}}
#ask: [[category:rozwiazanie]] [[jestRozwiazaniem::problem:{{ id }}]] |
   ?napisaneW=Język |
   default=Brak wyników!
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
