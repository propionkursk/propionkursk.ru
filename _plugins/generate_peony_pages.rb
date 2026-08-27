module Peonies
  # Один раз на сборку создаёт страницу /catalog/{group}/{slug}/ для каждой
  # записи в _data/peonies.yml (раздел 5, "Этап 4" из MASTER-PEONY-001: новый
  # сорт = запись в yml + фото, без ручных файлов и без переделки шаблона).
  class PageGenerator < Jekyll::Generator
    safe true

    def generate(site)
      varieties = site.data["peonies"] || []

      varieties.each do |variety|
        site.pages << PeonyPage.new(site, variety)
      end
    end
  end

  # PageWithoutAFile: страница существует только в памяти сборки, без
  # исходного файла на диске — контент целиком приходит из layout + data.
  class PeonyPage < Jekyll::PageWithoutAFile
    def initialize(site, variety)
      @site = site
      @base = site.source
      @dir = File.join("catalog", variety["group"].to_s, variety["slug"].to_s)
      @name = "index.html"

      self.process(@name)
      self.data = {
        "layout" => "peony",
        "variety" => variety,
      }
      self.content = ""
    end
  end
end
