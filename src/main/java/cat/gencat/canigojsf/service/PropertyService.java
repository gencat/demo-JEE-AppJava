package cat.gencat.canigojsf.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import cat.gencat.ctti.canigo.arch.core.config.ICustomPropertyPlaceHolderConfigurer;


@Repository("propertyService")
@Scope("singleton")
@Lazy
public class PropertyService {
	
	private ICustomPropertyPlaceHolderConfigurer config = null;
	
	@Autowired
	public void setConfig(ICustomPropertyPlaceHolderConfigurer config) {
		this.config = config;
	}

	public ICustomPropertyPlaceHolderConfigurer getConfig() {
		return config;
	}

	public Map<String,String> getValues(){
		return config.getResolvedProps();
	}

	public List<String> getItemKeys() {
		List<String> keys = new ArrayList<String>();
		keys.addAll(getValues().keySet());
		return keys;
	}
}
