defmodule UiWeb.PageController do
  use UiWeb, :controller
  plug :put_layout, false

  def index(conn, _params) do
    render conn, "index.html"
  end

  def fallback(conn, _params) do
    render conn, "index.html"
  end
end
