# тестовое задание

1. Создать компонент для отображения набора однотипных данных в табличном виде
   Требуется универсальный класс, должна быть возможность его пере использовать для других объектов без изменения
   внутренней логики.
   Можно использовать любые вспомогательные библиотеки, кроме готовых js реализаций таблиц/гридов.

Строки должны быть отсортированы по RegNumber.
Порядок столбцов в таблице: RegNuber, Device (esn из devices), VIN, Model, InventoryNumber, ReleaseDate.
При построении таблицы, все данные должны уже быть на клиенте.

Тестовые данные приложены в письме.
В тестовом задании их можно либо встроить в страницу явно через тэг script либо получить любым другим удобным способом.
Для корректного отображения Device в таблице нужно, в коде, слить данные из cars.json и devices.json, по полю DeviceId
из cars.

2. Добавить возможность фильтрации отображаемых объектов на клиенте.
   Над таблицей нужно расположить текстовое поле ввода.
   При изменении текстового поля пользователем, через 0.3сек (желательно реализовать задержку вызова самостоятельно)
   либо при нажатии enter должна происходить фильтрация объектов.
   Под изменением считать результат любого нажатия клавиши на клавиатуре, а не только событие "change".
   Фильтрация проходит по всем отображаемым полям и работает как поиск вхождения подстроки в отображаемом значении.
   Если фильтр начинается с символа "^" то считается, что подстрока должна быть в самом начале строки (аналогично
   знаку "^" в регулярных выражениях).
   Фильтрация всегда проходит по всем имеющимся объектам (а не только тем что сейчас видны в таблице).
   После фильтрации в таблице должны отображаться только те объекты которые прошли требования фильтра.
   При удалении всех символов в таблице должны быть видны все объекты.


3. Добавить выделение строк при клике.
   При клике по строке изменять её фон на светло серый. При фильтрации выделения сбрасываться.

Без реализации:
Подумать о возможности расширения функционала таблицы для:

* перемещения колонок,
* сортировки данных в столбцах по клику на столбце,
* добавления отдельным строкам какого-либо css класса (при построении таблицы) в зависимости от результата некоторой
  ф-ции,
* inline редактирование данных в таблице,
* возможность скрывать/добавлять столбцы в таблицу.

В тестовом задании не будет учитываться визуальное оформление, только сам код.
Работа будет проверяться под браузером chrome.
Цель задания оценить понимание основ js (замыкания, this, события).
Также будет оцениваться оптимальность, читаемость и расширяемость кода.
