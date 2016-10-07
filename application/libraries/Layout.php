<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Layout
{
    public $CI;
    public $layout;
    protected $pageData = array();
    protected $module;

    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function setLayout($layout)
    {
        $this->layout = $layout;
    }

    public function load($layout, $module, $data = array())
    {
        $this->pageData = $data;
        $this->layout = $layout;
        $this->module = $module;
        return $this->loadLayout($this->layout, $module);
    }

    /**
     * 加载layout
     * @param $name
     * @param string $module
     * @return mixed
     */
    protected function loadLayout($name, $module = 'public')
    {
        $content = '';
        $data = array();
        if ($meta = $this->requireMeta($module, 'layout', $name)) {
            foreach ($meta as $chileName => $attr) {
                if (isset($attr['module'])) {
                    $customModule = $attr['module'];
                } else {
                    //没有设置module参数, 默认使用当前module的
                    if ($this->isRequireCustom($chileName, $attr['type'])) {
                        $customModule = $this->module;
                    } else {
                        $customModule = 'public';
                    }
                }
                if ($attr['type'] === 'layout') {
                    $content .= $this->loadLayout($chileName, $customModule);
                } elseif ($attr['type'] === 'view') {
                    $content .= $this->loadView($chileName, $customModule, $this->pageData);
                }
            }
            $this->pageData['content'] = $content;
            return $this->CI->load->view($name, $this->pageData, true);
        } else {
            //error
        }
    }

    /**
     * 加载view
     * @param $name
     * @param string $module
     * @param array $data
     * @return mixed
     */
    public function loadView($name, $module = 'public', $data = array())
    {
        $viewPath = $module . '/' . $name;;
        $viewData['name'] = $name;
        $viewData['model'] = $data;
        $viewData['meta'] = $this->requireMeta($module, 'view', $name);

        return $this->CI->load->view($viewPath, $viewData, true);
    }

    /**
     * 加载布局配置文件
     * @param $module
     * @param $type
     * @param $name
     * @return bool|array
     */
    protected function requireMeta($module, $type, $name)
    {
        $path = array(
            'modules',
            $module,
            'meta',
            $type.'s',
            $name . '.php'
        );
        $file = APPPATH . implode(DIRECTORY_SEPARATOR, $path);
        if (file_exists($file)) {
            return require_once($file);
        } else {
            return false;
        }
    }

    protected function isRequireCustom($name, $type)
    {
        $path = array(
            'modules',
            $this->module,
            'views',
            $name . '.php'
        );
        if (file_exists(APPPATH . implode(DIRECTORY_SEPARATOR, $path))) {
            return true;
        } else {
            return false;
        }
    }
}
