## Старт проекта
### 1. Установка модулей
```
npm i
```

### 2. Сборка PNG спрайтов
```
npm run png-sprites
```

### 3. Запуск с отслеживанием изменений
```
npm run serve
```

## Команды для запуска
### Запуск с отслеживанием изменений
```
npm run serve
```

### Сборка в папку `dist`
```
npm run build
```

### Production cборка в папку `dist`
```
npm run prod
```

### Очистка папки `dist`
```
npm run clean
```

### Сборка PNG спрайтов
```
npm run png-sprites
```

### Сборка SVG спрайта
```
npm run svg-sprite
```

## Структура папок и файлов
```
├── app/                                # Исходники
│   ├── blocks/                         # Блоки
│   │   └── block/                      # Блок
│   │       ├── block.pug               # Разметка блока
│   │       ├── block.js                # Скрипт блока
│   │       └── block.scss              # Стили блока
│   ├── images/                         # Изображения
│   ├── pages/                          # Страницы
│   │   └── index.pug                   # Разметка страницы
│   ├── png-icons/                      # PNG иконки для генерации растровых спрайтов
│   ├── resources/                      # Статические файлы для копирования в dist
│   ├── scripts/                        # Скрипты
│   │   └── app.js                      # Главный скрипт
│   └── styles/                         # Стили
│       ├── _helpers.scss               # Помощники
│       ├── _optimize.scss              # Сброс и нормализация стилей
│       ├── _png-sprites.scss           # Переменные с данными PNG спрайтов (автосборка)
│       ├── _variables.scss             # Переменные
│       └── app.scss                    # Главный стилевой файл
│   ├── svg-icons/                      # SVG иконки для генерации векторного спрайта
├── dist/                               # Сборка (автогенерация)
│   ├── assets/                         # Подключаемые ресурсы
│   │   ├── images/                     # Изображения
│   │   │   └── sprites                 # PNG спрайты (автогенерация)
│   │   │   │   └── sprite.png          # Обычный PNG спрайт (автогенерация)
│   │   │   │   └── sprite@2x.png       # PNG-retina спрайт (автогенерация)
│   │   ├── scripts/                    # Скрипты
│   │   └── styles/                     # Стили
│   │   └── svg/                        # Svg
│   │   │   └── svg-sprite.svg          # Svg спрайт (автогенерация)
│   └── index.html                      # Страница
├── gulp-tasks/                         # Подключаемые скрипты с задачами для gulpfile.js
│   ├── clean.js                        # Очистка папки dist
│   ├── copy.js                         # Копирование
│   ├── images.js                       # Минификация изображений
│   ├── png-sprites.js                  # Сборка PNG спрайтов и CSS переменных
│   ├── scripts.js                      # Сборка ES2015 скриптов и преобразование в ES5 
│   ├── styles.js                       # Сборка стилей
│   ├── svg-sprite.js                   # SVG спрайт (автогенерация)
│   ├── templates.js                    # Сборка страниц из PUG шаблонов
├── .eslintrc                           # Конфигурация проверки JavaScript в ESLint
├── .gitignore                          # Список исключённых файлов из Git
├── .pug-lintrc                         # Конфигурация проверки PUG шаблонов
├── .stylelintrc                        # Конфигурация проверки SCSS
├── gulpfile.js                         # Файл для запуска Gulp.js
├── package.json                        # Список модулей и прочей информации
├── readme.md                           # Документация шаблона
```


## Как собираются и используются PNG спрайты

В шаблоне предусмотрена сборка нескольких PNG спрайтов (обычного и Retina) и их данных в CSS переменные.

### Добавление PNG иконок

Для создания спрайта нужно добавить в папку `app/png-icons`. Retina иконки добавлять в эту же папку рядом с обычными и в конце названия файла добавить `@2x`, например:
```
└── app/
    └── png-icons/
        └── startup.png
        └── startup@2x.png
```

### Сборка спрайтов

* В папке `dist/assets/images/sprites` появятся два спрайта: обычный и Retina с `@2x` и в `app/styles` один стилевой файл с примесями.
```
├── app/
│    └── styles/
│       └── _png-sprites.scss
└── dist/
    └── assets/
        └── images/
            └── sprites
                └── sprite.png
                └── sprite@2x.png
```

* В сборочных папках останутся только актуальные спрайты и стили в случае, если удалить исходные папки с иконками.

### Использование спрайтов

#### Retina спрайты

Для подключения иконки используется миксин `retina-sprite` со значением `$icon-group`, где `icon` это название PNG иконки, например:
```css
.icon
    @include retina-sprite($icon-group);
```

В собранном виде в CSS добавятся обычный спрайт и медиа-запрос, чтобы отображать Retina спрайт только при необходимости и это будет выглядеть так:
```css
.icon {
  background-image: url('../images/sprites/sprite.png');
  background-position: -70px 0;
  width: 60px;
  height: 60px;
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .icon {
    background-image: url('../images/sprites/sprite@2x.png');
    background-size: 130px 60px;
  }
}
```

#### Обычные спрайты

Для подключения иконки используется миксин `sprite` со значением `$icon`, где `icon` это название PNG иконки, например:
```css
.icon
    @include sprite($icon);
```

В собранном виде в CSS добавится только обычный спрайт и это будет выглядеть так:
```css
.icon {
    background-image: url('../images/sprites/sprite.png');
    background-position: -70px 0;
    width: 60px;
    height: 60px;
}
```


## Как собирается и используется SVG спрайты

В шаблоне предусмотрена сборка символьного SVG спрайта.

### Добавление SVG иконок

Для создания спрайта нужно добавить SVG иконки в папку `app/svg-icons`.

### Использование спрайтов

Иконка выводится с помощью тега `use`, например:
```template.pug
svg.svg-icon(width='60px', height='60px')
    use(xlink:href='./assets/svg/svg-sprite.svg#icon-startup')
```
где `#icon-startup` это id иконки в спрайте, а `startup` – название svg иконки.

