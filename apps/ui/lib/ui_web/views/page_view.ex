defmodule UiWeb.PageView do
  use UiWeb, :view

  def render("index.html", _assigns) do
    base = case Application.get_env(:ui, :environment) do
             :prod -> [Application.app_dir(:ui)]
             _ -> [__DIR__, "..", "..", ".."]
           end
    index_html = Path.join(base ++ ["priv", "static", "index.html"])
    html = File.read!(index_html)
    {:safe, html}
  end
end
