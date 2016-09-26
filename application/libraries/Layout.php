<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Layout
{
    public $CI;
    public $layout;
    protected $pageData = array();
    protected $module;
//    public static $modulePath = APPPATH.'modules/';

    public function __construct()
    {
        $this->CI =& get_instance();
    }

    public function setLayout($layout)
    {
        $this->layout = $layout;
    }

    public function load($module, $layout = 'main', $data = array())
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
        if ($meta = $this->requireMeta($module, 'layout', $name)) {
            foreach ($meta as $chileName => $attr) {
                if (isset($attr['module'])) {
                    $customModule = $attr['module'];
                } else {
                    $customModule = $module;
                }
                if ($attr['type'] === 'layout') {
                    $content .= $this->loadLayout($chileName, $customModule);
                } elseif ($attr['type'] === 'view') {
                    $content .= $this->loadView($chileName, $customModule);
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
     * @return mixed
     */
    protected function loadView($name, $module = 'public')
    {
        $viewPath = $name;
        if ($this->module !== $module) {
            if (!file_exists(APPPATH.'modules/'.$this->module.'/views/'.$name.'.php')) {
                $viewPath = $module . '/' . $name;
            }
        }
        return $this->CI->load->view($viewPath, $this->pageData, true);
    }

    /**
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
            $name . '.php'
        );
        $file = APPPATH . implode(DIRECTORY_SEPARATOR, $path);
        if (file_exists($file)) {
            return include_once($file);
        } else {
            return false;
        }
    }
}
