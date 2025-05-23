# JSON-модели блоков и предметов

Помните этот чрезвычайно громоздкий и абсолютно нечитабельный код добавления вариаций кастомного блока, зарегистрированного в Java? Было непозволительно оставить это так и подвергнуть Java-разработчиков страданиям от тех сумасшедших последовательных вызовов с `JSONObject`ами and `JSONArray`ами. Поэтому было принято решение (почти) полностью портировать **парсер JSON-моделей блоков и предметов** с `Minecraft: Java Edition`.

:::tip Создавайте модели как никогда проще

Для понимания JSON-формата моделей блоков и предметов, есть [эта статья на официальной вики Майнкрафт (англ.)](https://minecraft.wiki/w/Tutorials/Models).

:::

Все директории `blockstates/` и `models/` должны быть внутри директории ресурсов KEX, более подробно об этом читайте в [предыдущей статье](kex-config.md). Имена JSON-файлов в директориях `blockstates/` и `models/item/` должны быть такими же, как строковые ID блоков и предметов, которые вы зарегистрировали, чтобы присвоить им эти модели. Например:

```java
BlockRegistry.register(new MyBlock("my_block"));
ItemRegistry.register(new MyItem("my_item"));
```

Следовательно, вы должны будете создать файлы `blockstates/my_block.json` и `models/item/my_item.json`.

Для того, чтобы вы не создавали самостоятельно такие базовые шаблонные модели, как куб, колонна, крестовина и т.д., KEX предоставляет вам 56 таких моделей. Их список вы можете увидеть, зайдя в директорию мода KernelExtension и перейдя в `kex-res/models/block/`, или зайдя в [эту папку в публичном GitHub-репозитории KernelExtension](https://github.com/DMHYT/KernelExtension/tree/main/src/assets/root/kex-res/models/block).

<details>
<summary>Список различий между JSON-парсером моделей блоков и предметов KEX и оригинальным в Java-Майнкрафте.</summary>
<div>

- **Различия в JSON-формате `blockstates`:**
  - Параметр `variants` должен быть массивом вместо объекта. Индекс каждого JSON-описания варианта в этом массиве соответствует значению даты, на которую этот вариант модели будет установлен. Добавление поддержки блок-стейтов планируется в будущих обновлениях.
  - В `multipart` поддерживаются только [ICRender-группы](/api/namespace/ICRender#getGroup). В условиях `north`, `south`, `west` и `east`, вместо `side` или `up` вы должны писать название ICRender-группы, или несколько групп, разделённых с помощью **`|`**. Также дополнительно поддерживается оператор `НЕ`. Если вы добавите **`!`** перед названием ICRender-группы, это пропарсится как `НЕ(группа)`. Добавление поддержки остальных блок-стейтов планируется в грядущих обновлениях.
- **Различия в JSON-формате `models`:**
  - Параметр `ambientocclusion` не поддерживается
  - В параметре `display` поддерживаются только ключи `"hand"` и `"gui"` (`"hand"` вместо `"thirdperson_righthand"`, `"thirdperson_lefthand"`, `"firstperson_righthand"` and `"firstperson_lefthand"` вместе взятых)
  - Параметр `shade` в кубах (элементах) не поддерживается
  - Параметры `cullface` и `tintindex` в гранях кубов (элементов) не поддерживаются
  - В моделях предметов, параметры `gui_light` и `overrides` не поддерживаются (поддержка `overrides` планируется в будущих обновлениях)
  - В текстурах моделей предметов, формат `"layerN"` не поддерживается, если вы хотите предмет с дефолтной (плоской) моделью, не используйте JSON-модели, просто вызывайте `setIcon` или имплементируйте компонент `IHasDynamicIcon`.

</div>
</details>
