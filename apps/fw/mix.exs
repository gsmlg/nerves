defmodule Fw.MixProject do
  use Mix.Project

  @app :fw
  @all_targets [:rpi0, :rpi3, :rpi]

  def project do
    [
      app: :fw,
      version: "0.1.0",
      elixir: "~> 1.8",
      archives: [nerves_bootstrap: "~> 1.6"],
      deps_path: "../../deps",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      lockfile: "../../mix.lock",
      start_permanent: Mix.env() == :prod,
      aliases: [loadconfig: [&bootstrap/1]],
      build_embedded: Mix.target() != :host,
      releases: [{@app, release()}],
      preferred_cli_target: [run: :host, test: :host],
      deps: deps()
    ]
  end

  def release do
    [
      overwrite: true,
      cookie: "#{@app}_cookie",
      include_erts: &Nerves.Release.erts/0,
      steps: [&Nerves.Release.init/1, :assemble],
      strip_beams: Mix.env() == :prod
    ]
  end

  # Starting nerves_bootstrap adds the required aliases to Mix.Project.config()
  # Aliases are only added if MIX_TARGET is set.
  def bootstrap(args) do
    Application.start(:nerves_bootstrap)
    Mix.Task.run("loadconfig", args)
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {Fw.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:nerves, "~> 1.5", runtime: false},
      {:distillery, "~> 2.1"},
      {:ui, in_umbrella: true},
      {:nerves_network, "~> 0.3"},
      {:nerves_network_interface, "~> 0.4"},
      {:nerves_runtime_shell, "~> 0.1"},
      {:shoehorn, "~> 0.6"},
      {:httpoison, "~> 1.0"},
      # {:dhcp_server, "~> 0.4"}

      # Dependencies for all targets except :host
      {:nerves_runtime, "~> 0.6", targets: @all_targets},

      # Dependencies for specific targets
      {:nerves_system_rpi, "~> 1.5", runtime: false, targets: :rpi},
      {:nerves_system_rpi0, "~> 1.5", runtime: false, targets: :rpi0},
      {:nerves_system_rpi2, "~> 1.5", runtime: false, targets: :rpi2},
      {:nerves_system_rpi3, "~> 1.5", runtime: false, targets: :rpi3},
      {:nerves_system_rpi3a, "~> 1.5", runtime: false, targets: :rpi3a},
      {:nerves_system_bbb, "~> 2.0", runtime: false, targets: :bbb},
      {:nerves_system_x86_64, "~> 1.5", runtime: false, targets: :x86_64}

    ]
  end

  defp system("rpi"), do: [{:nerves_system_rpi, "~> 1.0", runtime: false}]
  defp system("rpi0"), do: [{:nerves_system_rpi0, "~> 1.0", runtime: false}]
  defp system("rpi2"), do: [{:nerves_system_rpi2, "~> 1.0", runtime: false}]
  defp system("rpi3"), do: [{:nerves_system_rpi3, "~> 1.0", runtime: false}]
  defp system("bbb"), do: [{:nerves_system_bbb, "~> 1.0", runtime: false}]
  defp system("ev3"), do: [{:nerves_system_ev3, "~> 1.0", runtime: false}]
  defp system("qemu_arm"), do: [{:nerves_system_qemu_arm, "~> 1.0", runtime: false}]
  defp system("x86_64"), do: [{:nerves_system_x86_64, "~> 1.0", runtime: false}]
  defp system(target), do: Mix.raise("Unknown MIX_TARGET: #{target}")
end
