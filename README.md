# MyWardrobe
## Введение
Наименование программы:<br>
My Wardrobe<br>

Назначение и область применения:<br>
Сайт предназначен для облегчения составления образов на каждый день для людей, заинтересованных в моде. 
## Назначение и цели создания системы
Назначение разработки:<br> 
Функциональным назначением является предоставление зарегистрированному пользователю возможностей:<br>
1.	загружать снимки своей одежды и аксессуаров в соответствующие категории (верхняя одежда, обувь и т.д.) с последующим составлением коллажей из выбранных элементов;
2.	сортируя по дате или количеству лайков, искать коллажи других пользователей с помощью критериев (сезон (зима и т.д.) , стиль (классика и т.д.), дресс-код (работа, прогулка и т.д.)), с возможностью добавления их в избранное        посредством лайка.
3.  сортируя по дате или количеству лайков, искать коллажи других пользователей с помощью категорий (верхняя одежда, обувь и т.д.), с возможностью добавления их в избранное        посредством лайка.<br>

Сервис должен эксплуатироваться теми, кто интересуется модой, хочет развиваться в этой сфере и не желает проводить много времени около шкафа.<br>

Цели создания:<br>
Основная цель создания системы – облегчение составления образов на каждый день и поиск вдохновения среди единомышленников.
## Условия эксплуатации
Требования к квалификации и численности персонала:<br>
1.  Минимальное количество персонала, требуемого для работы сайта, должно составлять не менее 2 штатных единиц – системный администратор и пользователь программы – оператор.
2.  Системный администратор должен отвечать за поддержание работоспособности сайта.
3.  Пользователь программы (оператор) должен обладать практическими навыками работы с графическим пользовательским интерфейс.
## Требования к защите информации и программ
Требования к защите информации от несанкционированного доступа:<br>
Пользователь входит в систему с помощью пароля с возможностью восстановления через электронную почту.<br>
Требования к защите информации и программ не предъявляются.<br>

Требования к сохранности информации:<br>
Требования к сохранности информации при возникновении аварийных ситуаций не предъявляются.
## Требования к программной документации
Предварительный состав программной документации. Состав программной документации должен включать в себя:<br>
1.	техническое задание;
2.	программа и методика испытаний.
## Технико-экономические показатели
Экономические преимущества разработки:<br>
Ориентировочная экономическая эффективность не рассчитывается. Предполагаемое число использования программы в год – 365 сеансов работы на одном рабочем месте.   Экономические преимущества разработки в сравнении с лучшими отечественными и зарубежными аналогами не приводятся, так как неизвестна стоимость имеющихся аналогов.
## Разработка проекта системы базы данных
Требования к составу данных:<br>
1.	Информация о пользователях (фамилия, имя, логин, пароль, email, массив с id понравившихся коллажей).
2.	Информация о фотографиях элементов одежды и аксессуаров (фотография, категория (верхняя одежда, обувь, аксессуары и т.д.))
3.	Информация о коллажах (фотография, указание ключевых характеристик (дресс-код, стиль и сезон), количество лайкнувших).

Требования к представлению информации:<br>
Для представления информации о фотографиях, коллажах и пользователей используется СУБД MySQL.<br>

Требования по применению СУБД:<br>
СУБД применяется в целях осуществления:<br>
1.	структурированного хранения фотографий элементов одежды и аксессуаров и готовых коллажей пользователей.
2.	процесса регистрации и авторизации пользователя.
## Заполнение базы данных информацией
Требования к заполнению базы данных:<br>
Информация заполняется вручную или по запросу пользователя на сайте.<br>

Требования к источникам информации:<br>
1.	Информация о пользователе попадает в базу данных при регистрации.
2.	Фотографии в базу попадают по соответствующему запросу пользователя (когда он загружает их).
3.	Коллаж попадает в базу данных, когда пользователь желает сохранить его. 
