# TODO remove this after upgrading to RN 0.72

resolve_react_native = <<-JS
    require.resolve("react-native", {paths: ["#{Dir.pwd}"]})
JS

react_native_path = File.dirname(Pod::Executable.execute_command('node', ['-p', resolve_react_native]).strip)
react_native_pods_path = react_native_path + '/scripts/react_native_pods.rb'

resolve_cli_native_modules_script = <<-JS
    require.resolve("@react-native-community/cli-platform-ios/native_modules.rb", {paths: ["#{react_native_path}"]})
JS

cli_native_modules_script_path = Pod::Executable.execute_command('node', ['-p', resolve_cli_native_modules_script]).strip

require react_native_pods_path
require cli_native_modules_script_path
