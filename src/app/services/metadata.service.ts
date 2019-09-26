import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private titleService: Title,
    private meta: Meta
    ) { }

  SetMeta(title,description,keywords,author,image,image_type,robots, url) {
    
    title = ( title == null || title == '') ? title : environment.metas.title ; 
    description = ( description == null || description == '') ? description : environment.metas.description ; 
    keywords = ( keywords == null || keywords == '') ? keywords : environment.metas.keywords ; 
    author = ( author == null || author == '') ? author : environment.metas.author ; 
    image = ( image == null || image == '') ? image : environment.metas.image ; 
    image_type = ( image_type == null || image_type == '') ? image_type : environment.metas.image_type ; 
    robots = ( robots == null || robots == '') ? robots : environment.metas.robots ;  
    url = ( url == null || url == '') ? url : environment.metas.url ; 
    this.default(title,description,keywords,author,image,image_type,robots, url);
  }
  setDefaultMeta(){
    this.default(
      environment.metas.title,
      environment.metas.description,
      environment.metas.keywords,
      environment.metas.author,
      environment.metas.image,
      environment.metas.image_type,
      environment.metas.robots, 
      environment.metas.url
    );
  }

  default(title,description,keywords,author,image,image_type,robots, url) {
    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'keywords',          content: keywords});
    this.meta.updateTag({ name: 'description',       content: description});
    this.meta.updateTag({ name: 'author',            content: author});
    this.meta.updateTag({ name: 'robots',            content: robots });
    this.meta.updateTag({ name: 'og:title',      content: title });
    this.meta.updateTag({ name: 'og:url',        content: url });
    this.meta.updateTag({ name: 'og:image',      content: image });
    this.meta.updateTag({ name: 'og:description',content: description});
    this.meta.updateTag({ name: 'og:site_name',  content: title});
    this.meta.updateTag({ name: 'og:image',      content: image, itemprop: 'image' });
    this.meta.updateTag({ name: 'og:image:url',  content: image, itemprop: 'image' });
    this.meta.updateTag({ name: 'og:image:type', content: image_type });
    this.meta.updateTag({ name: 'twitter:card',  content: 'summary' });
    this.meta.updateTag({ property: 'keywords',      content: keywords});
    this.meta.updateTag({ property: 'description',   content: description});
    this.meta.updateTag({ property: 'author',        content: author});
    this.meta.updateTag({ property: 'robots',        content: robots });
    this.meta.updateTag({ property: 'og:title',      content: title });
    this.meta.updateTag({ property: 'og:url',        content: url });
    this.meta.updateTag({ property: 'og:image',      content: image });
    this.meta.updateTag({ property: 'og:description',content: description});
    this.meta.updateTag({ property: 'og:site_name',  content: title});
    this.meta.updateTag({ property: 'og:image',      content: image, itemprop: 'image' });
    this.meta.updateTag({ property: 'og:image:url',  content: image, itemprop: 'image' });
    this.meta.updateTag({ property: 'og:image:type', content: image_type });
    this.meta.updateTag({ property: 'twitter:card',  content: 'summary' });
  }

  initDefault() {
    this.init(
      environment.metas.title,
      environment.metas.description,
      environment.metas.keywords,
      environment.metas.author,
      environment.metas.image,
      environment.metas.image_type,
      environment.metas.robots, 
      environment.metas.url
    );
  }
  init(title,description,keywords,author,image,image_type,robots, url) {
    this.titleService.setTitle(title);
    this.meta.addTag({ name: 'keywords',          content: keywords});
    this.meta.addTag({ name: 'description',       content: description});
    this.meta.addTag({ name: 'author',            content: author});
    this.meta.addTag({ name: 'robots',            content: robots });
    this.meta.addTag({ name: 'og:title',      content: title });
    this.meta.addTag({ name: 'og:url',        content: url });
    this.meta.addTag({ name: 'og:image',      content: image });
    this.meta.addTag({ name: 'og:description',content: description});
    this.meta.addTag({ name: 'og:site_name',  content: title});
    this.meta.addTag({ name: 'og:image',      content: image, itemprop: 'image' });
    this.meta.addTag({ name: 'og:image:url',  content: image, itemprop: 'image' });
    this.meta.addTag({ name: 'og:image:type', content: image_type });
    this.meta.addTag({ name: 'twitter:card',  content: 'summary' });
    this.meta.addTag({ property: 'keywords',      content: keywords});
    this.meta.addTag({ property: 'description',   content: description});
    this.meta.addTag({ property: 'author',        content: author});
    this.meta.addTag({ property: 'robots',        content: robots });
    this.meta.addTag({ property: 'og:title',      content: title });
    this.meta.addTag({ property: 'og:url',        content: url });
    this.meta.addTag({ property: 'og:image',      content: image });
    this.meta.addTag({ property: 'og:description',content: description});
    this.meta.addTag({ property: 'og:site_name',  content: title});
    this.meta.addTag({ property: 'og:image',      content: image, itemprop: 'image' });
    this.meta.addTag({ property: 'og:image:url',  content: image, itemprop: 'image' });
    this.meta.addTag({ property: 'og:image:type', content: image_type });
    this.meta.addTag({ property: 'twitter:card',  content: 'summary' });




  }
}
