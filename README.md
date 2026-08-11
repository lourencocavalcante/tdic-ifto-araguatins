# Tecnologias Digitais de Informação e Comunicação

Material didático web para a disciplina **Tecnologias Digitais de Informação e Comunicação (TDIC)** do curso de **Licenciatura em Computação** do Instituto Federal do Tocantins — IFTO, Campus Araguatins.

**Professor:** Prof. Dr. Lourenço Cavalcante  
**Carga horária:** 40 horas / 40 aulas  
**Natureza:** disciplina eletiva  
**Organização:** 24 h teóricas + 16 h práticas; planejamento didático com 32 h presenciais e 8 h a distância, conforme a estrutura das vagas de eletiva da matriz curricular.

## Finalidade

O projeto reúne, em uma única página, fundamentação teórica, exemplos, demonstrações interativas, práticas, planejamento de 40 aulas, critérios de avaliação, projeto integrador, bibliografia e materiais de apoio. Foi projetado para funcionar como roteiro de aula, material de projeção, apostila digital e referência para estudo.

## Base curricular

A organização mantém os conteúdos e competências/habilidades definidos no PPC da Licenciatura em Computação do IFTO Campus Araguatins. A página diferencia a redação oficial do PPC das decisões de organização pedagógica adotadas para distribuir e operacionalizar as 40 aulas.

A disciplina TDIC integra a lista de eletivas do PPC. O documento prevê espaços de Eletiva I, II e III em diferentes períodos; portanto, o projeto não fixa um único período para a disciplina e indica que a oferta depende da definição institucional do semestre.

## Estrutura

```text
/
├── index.html
├── styles.css
├── script.js
├── README.md
└── materiais/
    ├── roteiro-diagnostico-turma.md
    ├── checklist-avaliacao-software-educacional.md
    ├── template-plano-atividade-tdic.md
    ├── rubrica-projeto-final.md
    └── guia-hipermidia-educacional.md
```

Não há dependência de servidor, banco de dados, processo de compilação ou bibliotecas externas.

## Recursos de interface

- navegação lateral hierárquica e responsiva;
- destaque automático da seção em leitura;
- menu para smartphone;
- modo de apresentação;
- controle global de animações;
- respeito a `prefers-reduced-motion`;
- demonstrações em HTML/CSS/JavaScript;
- células de exemplo com botão de cópia;
- seleção de texto com modal de destaque para projeção;
- atalhos `+`, `-`, `F` e `Esc` no modal de destaque;
- tamanho do texto do modal persistido no navegador;
- navegação por teclado e estilos de `focus-visible`.

## Publicação no GitHub Pages

1. Crie um repositório e envie todos os arquivos mantendo `index.html` na raiz.
2. No GitHub, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione publicação a partir de uma branch.
4. Escolha a branch principal e a pasta raiz `/`.
5. Salve e aguarde a publicação.

Como todos os caminhos são relativos, o projeto funciona tanto em domínio próprio quanto em repositório publicado como subdiretório do GitHub Pages.

## Materiais

Os arquivos da pasta `materiais/` são editáveis e podem ser adaptados ao Plano de Ensino, ao calendário e às características da turma.

## Requisitos

Navegador moderno com JavaScript habilitado. As funções centrais de leitura permanecem disponíveis mesmo quando animações são reduzidas.

## Licença

A definição da licença de distribuição do projeto e dos materiais deve ser feita pelo autor em conformidade com as orientações institucionais e com as licenças dos recursos eventualmente incorporados.
