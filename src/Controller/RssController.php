<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RssController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function homepage(){
        return new Response('hello');
    }

    /**
     * @Route("/test/{slug}")
     */
    public function show($slug){

        $answers = [
            'this is answers 1',
            'this is answers 2',
            'this is answers 3',
            'this is answers 4',
        ];    
        return $this->render('/rss/show.html.twig', [
            'question' => ucwords(str_replace('-', ' ', $slug)),
            'answers' => $answers,
        ]);

    }
}