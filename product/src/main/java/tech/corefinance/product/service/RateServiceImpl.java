package tech.corefinance.product.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import tech.corefinance.common.ex.ServiceProcessingException;
import tech.corefinance.common.model.CreateUpdateDto;
import tech.corefinance.product.dto.RateResponse;
import tech.corefinance.product.entity.Rate;
import tech.corefinance.product.repository.RateRepository;
import tech.corefinance.product.repository.RateSourceRepository;

@Service
@Transactional
public class RateServiceImpl implements RateService {

    @Autowired
    private RateRepository rateRepository;
    @Autowired
    private RateSourceRepository rateSourceRepository;

    @Override
    public RateRepository getRepository() {
        return rateRepository;
    }

    @Override
    public <D extends CreateUpdateDto<String>> void copyAdditionalPropertiesFromDtoToEntity(D source, Rate dest) {
        RateService.super.copyAdditionalPropertiesFromDtoToEntity(source, dest);
        if (source instanceof RateResponse rateResponse && StringUtils.hasText(rateResponse.getRateSourceId())) {
            var optional = rateSourceRepository.findById(rateResponse.getRateSourceId());
            dest.setRateSource(optional.orElseThrow(() -> new ServiceProcessingException("rate_source_not_found")));
        }
    }
}
